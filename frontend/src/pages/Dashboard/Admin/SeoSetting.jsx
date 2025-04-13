import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SiteSettingsForm() {
  const [form, setForm] = useState({
    logoImg: "",
    nameWebsite: "",
    titleWebsite: "",
    imgBanner1: "",
    imgBanner2: "",
    h3Banner1: "",
    h3Banner2: "",
    pBanner1: "",
    pBanner2: "",
    h1Banner1: "",
    h1Banner2: "",
    imgGallary1: "",
    imgGallary2: "",
    imgGallary3: "",
    imgGallary4: "",
    imgGallary5: "",
    titlePopularClasses: "",
    titlePopularInstructors: "",
  });

  const [loading, setLoading] = useState(true);

  // Load data từ API khi load trang
  useEffect(() => {
    axios
      .get("http://localhost:3000/site-settings")
      .then((response) => {
        if (response.data) {
          setForm(response.data); // Đặt giá trị dữ liệu trả về
        }
        setLoading(false); // Đặt trạng thái loading thành false sau khi tải xong
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Đặt trạng thái loading thành false khi có lỗi
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/site-settings", form)
      .then(() => toast.success("Cập nhật thành công!"))
      .catch(() => toast.error("Có lỗi xảy ra khi cập nhật."));
  };

  return (
    <div className="flex justify-center hover:border-secondary  min-h-screen bg-gray-100 p-8">
      <div className=" max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold    mb-6">
          Configuration <span className="text-secondary">Website</span>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Row nameWebsite + titleWebsite */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium  ">Name Website</label>
              <input
                type="text"
                name="nameWebsite"
                value={form.nameWebsite}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium ">Title Website</label>
              <input
                type="text"
                name="titleWebsite"
                value={form.titleWebsite}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          {/* Các trường input khác */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium ">Logo URL</label>
              <input
                type="text"
                name="logoImg"
                value={form.logoImg}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium ">Image Banner 1</label>
              <input
                type="text"
                name="imgBanner1"
                value={form.imgBanner1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">
                Image Banner 2
              </label>
              <input
                type="text"
                name="imgBanner2"
                value={form.imgBanner2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">H3 Banner 1</label>
              <input
                type="text"
                name="h3Banner1"
                value={form.h3Banner1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">H3 Banner 2</label>
              <input
                type="text"
                name="h3Banner2"
                value={form.h3Banner2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">P Banner 1</label>
              <input
                type="text"
                name="pBanner1"
                value={form.pBanner1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">P Banner 2</label>
              <input
                type="text"
                name="pBanner2"
                value={form.pBanner2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">H1 Banner 1</label>
              <input
                type="text"
                name="h1Banner1"
                value={form.h1Banner1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">H1 Banner 2</label>
              <input
                type="text"
                name="h1Banner2"
                value={form.h1Banner2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">
                Image Gallery 1
              </label>
              <input
                type="text"
                name="imgGallary1"
                value={form.imgGallary1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">
                Image Gallery 2
              </label>
              <input
                type="text"
                name="imgGallary2"
                value={form.imgGallary2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">
                Image Gallery 3
              </label>
              <input
                type="text"
                name="imgGallary3"
                value={form.imgGallary3}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">
                Image Gallery 4
              </label>
              <input
                type="text"
                name="imgGallary4"
                value={form.imgGallary4}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">
                Image Gallery 5
              </label>
              <input
                type="text"
                name="imgGallary5"
                value={form.imgGallary5}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium   ">
                Title classes popular
              </label>
              <input
                type="text"
                name="titlePopularClasses"
                value={form.titlePopularClasses}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium   ">
                Title Instructor popular
              </label>
              <input
                type="text"
                name="titlePopularInstructors"
                value={form.titlePopularInstructors}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-secondary hover:shadow-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
          >
            Save Settings
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default SiteSettingsForm;
