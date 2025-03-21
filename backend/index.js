const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMEN_SECRET);
var jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// verify token
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Invalid authorization" });
  }
  const token = authorization?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    req.decode = decode;
    next();
  });
};

//addmin middleware for admin and instrustor
const verifyAdmin = async (req, res, nex) => {
  const email = req.decode.email;
  const query = { email: email };
  const user = await usersCollections.findOne(query);
  if (user.role == "admin") {
    next();
  } else {
    return res.status(401).send({ message: "Not Access" });
  }
};

const verifyInstrustor = async (req, res, nex) => {
  const email = req.decode.email;
  const query = { email: email };
  const user = await usersCollections.findOne(query);
  if (user.role == "instrustor") {
    next();
  } else {
    return res.status(401).send({ message: "Not Access" });
  }
};

// conect mongodb

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  Transaction,
} = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cbn97.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a dabase and collection
    const databse = client.db("study");
    const usersCollections = databse.collection("users");
    const classesCollections = databse.collection("classes");
    const cartCollections = databse.collection("cart");
    const paymentCollections = databse.collection("payment");
    const errolledCollections = databse.collection("errolled");
    const appliedCollection = databse.collection("applied");

    // routers for users
    app.post("/api/set-token", async (req, res) => {
      const user = req.body;
      const secretKey = process.env.ACCESS_SECRET || "mySuperSecretKey";
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

      res.send(token);
    });
    app.post("/new-user", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollections.insertOne(newUser);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollections.find().toArray();
      res.send(result);
    });

    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.findOne(query);
      res.send(result);
    });

    app.get("/user/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollections.findOne(query);
      res.send(result);
    });

    app.delete("/delete-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.deleteOne(query);
      res.send(result);
    });

    app.put("/update-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
          password: updateUser.password,
          role: updateUser.role,
          address: updateUser.address,
          about: updateUser.about,
          photoUrl: updateUser.photoUrl,
          skills: updateUser.skills ? updateUser.skills : null,
        },
      };
      const result = await usersCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // classes router
    app.post("/new-class", verifyJWT, verifyInstrustor, async (req, res) => {
      const newClass = req.body;
      const result = await classesCollections.insertOne(newClass);
      res.send(result);
    });

    app.get("/classes", async (req, res) => {
      const query = { status: "approved" };
      const result = await classesCollections.find(query).toArray();
      res.send(result);
    });

    //classes by email
    app.get(
      "/classes/:email",
      verifyJWT,
      verifyInstrustor,
      async (req, res) => {
        const email = req.params.email;
        const query = { instrustorEmail: email };
        const result = await classesCollections.find(query).toArray();
        res.send(result);
      }
    );

    //manage classes
    app.get("/manage-classes", async (req, res) => {
      const result = await classesCollections.find().toArray();
      res.send(result);
    });

    // update classes status and reason
    app.patch(
      "/change-status/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const status = req.body.status;
        const reason = req.body.reson;
        const filter = { _id: new ObjectId(id) };
        const otions = { upsert: true };
        const updateDoc = {
          $set: {
            status: status,
            reason: reason,
          },
        };
        const result = await classesCollections.updateOne(
          filter,
          updateDoc,
          otions
        );
        res.send(result);
      }
    );

    // get approved classes
    app.get("/approved-classes", async (req, res) => {
      const query = { status: "approved" };
      const result = await classesCollections.find(query).toArray();
      res.send(result);
    });

    // get signle class details
    app.get("/class/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await classesCollections.findOne(query);
      res.send(result);
    });

    // update class detail
    app.put(
      "/update-class/:id",
      verifyJWT,
      verifyInstrustor,
      async (req, res) => {
        const id = req.params.id;
        const updateClass = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            name: updateClass.name,
            description: updateClass.description,
            price: updateClass.price,
            availiableSeats: updateClass.availiableSeats,
            videoLink: updateClass.videoLink,
            status: "pending",
          },
        };
        const result = await classesCollections.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      }
    );

    // cart Router
    app.post("/add-to-cart", verifyJWT, async (req, res) => {
      const newCartItems = req.body;
      const result = await cartCollections.insertOne(newCartItems);
      res.send(result);
    });

    // get cart items by id
    app.get("/cart-item/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const email = req.query.email;
      const query = {
        classId: id,
        UserMail: email,
      };
      const projection = { classId: 1 };
      const result = await cartCollections.findOne(query, {
        projection: projection,
      });
      res.send(result);
    });

    // get info cart items by  users email
    app.get("/cart/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { UserMail: email };
      const projection = { classId: 1 };
      const carts = await cartCollections.findO(query, {
        projection: projection,
      });
      const classIds = carts.map((cart) => new ObjectId(cart.classId));
      const query2 = { _id: { $in: classIds } };
      const result2 = await classesCollections.find(query2).toArray();
      res.send(result2);
    });

    // delete cart item
    app.delete("/delete-cart-item/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { classId: id };
      const result = await cartCollections.deleteOne(query);
      res.send(result);
    });

    // payment router
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // post payment info to db
    app.post("/payment-info", async (req, res) => {
      const paymentInfo = req.body;
      const classId = paymentInfo.classId;
      const userEmail = paymentInfo.email;
      const signClassId = req.body.classId;
      let query;
      if (signClassId) {
        query = { classId: signClassId, userEmail: userEmail };
      } else {
        query = { classId: { $in: classId } };
      }
      const classesQuery = {
        _id: { $in: classId.map((id) => new ObjectId(id)) },
      };
      const classes = await classesCollections.find(classesQuery).toArray();
      const newErrolledData = {
        userEmail: userEmail,
        classId: signClassId.map((id) => new ObjectId(id)),
        transactionId: paymentInfo.transactionId,
      };
      const updateDoc = {
        $set: {
          totalErrolled:
            classId.reduce(
              (total, current) => total + current.totalErrolled,
              0
            ) + 1 || 0,
          totalErrolled:
            classId.reduce(
              (total, current) => total + current.totalErrolled,
              0
            ) - 1 || 0,
        },
      };
      const updateResult = await classesCollections.updateMany(
        classesQuery,
        updateDoc,
        { upsert: true }
      );
      const errolledResult = await errolledCollections.insertOne(
        newErrolledData
      );
      const deleteResult = await cartCollections.deleteMany(query);
      const paymentResult = await paymentCollections.insertOne(paymentInfo);
      res.send(paymentResult, deleteResult, errolledResult, updateResult);
    });

    // get payment history
    app.get("/payment-history/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await paymentCollections
        .find(query)
        .sort({ date: -1 })
        .toArray();
      res.send(result);
    });

    // get payment history length
    app.get("/payment-history-length/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const total = await paymentCollections.countDocuments(query);
      res.send(total);
    });

    // ErrolledPayment routers
    app.get("/popular-classes", async (req, res) => {
      const result = await classesCollections
        .find()
        .sort({ totalErrolled: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });
    app.get("/popular-instructors", async (req, res) => {
      try {
        // const allClasses = await usersCollections.find({}).toArray();
        // console.log("Classes Data:", allClasses);

        const pipeline = [
          // {
          //   $match: {
          //     instructorEmail: { $exists: true, $ne: null },
          //     totalEnrolled: { $exists: true, $ne: null },
          //   },
          // },
          {
            $group: {
              _id: "$instructorEmail",
              totalEnrolled: { $sum: "$totalEnrolled" },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "email",
              as: "instructor",
            },
          },
          {
            $project: {
              _id: 0,
              instructor: { $arrayElemAt: ["$instructor", 0] }, // Lấy object instructor đầu tiên từ mảng
              totalEnrolled: 1,
            },
          },
          {
            $sort: { totalEnrolled: -1 },
          },
          {
            $limit: 6,
          },
        ];

        const result = await classesCollections.aggregate(pipeline).toArray();
        console.log("Popular Instructors:", result);
        res.send(result);
      } catch (error) {
        console.error("Error fetching popular instructors:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    //admin status
    app.get("/admin-status", verifyJWT, verifyAdmin, async (req, res) => {
      const approvedClasses = (
        await (await classesCollections.find({ status: "approved" })).toArray()
      ).length;
      const pendingClasses = (
        await (await classesCollections.find({ status: "pending" })).toArray()
      ).length;
      const intrustor = (
        await usersCollections.find({ role: "intrustor" })
      ).toArray().length;
      const totalClasses = (await (await classesCollections.find()).toArray())
        .length;
      const totalEnrolled = (await (await errolledCollections.find()).toArray())
        .length;

      const result = {
        approvedClasses,
        pendingClasses,
        intrustor,
        totalClasses,
        totalEnrolled,
      };
      res.send(result);
    });

    // get all intrustors
    app.get("/instructors", async (req, res) => {
      const result = await usersCollections
        .find({ role: "instructor" })
        .toArray();
      res.send(result);
    });

    app.get("/errolled-classes/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: "classes",
            localField: "classId",
            foreignField: "_id",
            as: "classes",
          },
        },
        {
          $unwind: "$classes",
        },
        {
          $lookup: {
            from: "users",
            localField: "classes.instrustorEmail",
            foreignField: "email",
            as: "intrustor",
          },
        },
        {
          $project: {
            _id: 0,
            intrustor: {
              $arrayElemAt: ["$intrustor", 0],
            },
            class: 1,
          },
        },
      ];

      const result = await errolledCollections.aggregate(pipeline).toArray();
      res.send(result);
    });

    // appliend for instrustors
    app.post("/ass-instrustor", async (req, res) => {
      const data = req.body;
      const result = await appliedCollection.insertOne(data);
      res.send(result);
    });

    app.get("/applied-instrustion/:email", async (req, res) => {
      const email = req.params.email;
      const result = await appliedCollection.findOne({ email });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//run server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
