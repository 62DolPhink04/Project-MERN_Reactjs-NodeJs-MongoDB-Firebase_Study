import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();

  console.log(data);

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure
        .get(`/enrolled-classes/${currentUser.email}`)
        .then((res) => {
          console.log("API response:", res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  return (
    <div>
      <h1 className="text-2xl my-6">Enrolled Classes</h1>
      <div>
        {data.map((item, index) => (
          <img
            src={item.classes.image}
            alt=""
            className="h-1/2 w-full sm:h-full sm-w-1/2 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
