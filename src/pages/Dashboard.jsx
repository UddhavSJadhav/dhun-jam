import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth.jsx";

import Chart from "../components/Chart.jsx";
import Loading from "../components/Loading.jsx";

import { axiosOpen } from "../utils/axios.js";

const Dashboard = () => {
  const { auth } = useAuth();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isSaving, setSaving] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosOpen.get(`/account/admin/${auth?.id}`);
      setData({ ...(data?.data || {}) });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "charge_customers")
      return setData((prev) => ({
        ...prev,
        charge_customers: event.target.id === "true",
      }));

    if (!data?.charge_customers) return;

    setData((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        [event.target.name]: Number(event.target.value) || "",
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div>
          <Loading className="w-10 inline-block animate-spin me-2 mb-1" />
          <span className="text-lg font-bold">Loading...</span>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await axiosOpen.put(`/account/admin/${auth?.id}`, {
        amount: data?.amount,
      });
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-600px mx-2 my-16">
        <h4 className="text-center text-heading font-bold">{`${data?.name}, ${data?.location} on Dhun Jam`}</h4>

        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex items-center">
            <div className="w-1/2 px-2">
              Do you want to charge your customers for requesting songs?
            </div>
            <div className="w-1/2 text-center px-2">
              <label htmlFor="true" className="me-5">
                <input
                  type="radio"
                  id="true"
                  name="charge_customers"
                  className="me-2"
                  checked={data?.charge_customers === true}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label htmlFor="false">
                <input
                  type="radio"
                  id="false"
                  name="charge_customers"
                  className="me-2"
                  checked={data?.charge_customers === false}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="mt-3 flex items-center">
            <div className="w-1/2 px-2">Custom song request amount-</div>
            <div className="w-1/2 text-center px-2">
              <input
                type="number"
                name="category_6"
                className={`outline-none bg-transparent w-full px-3 py-2 border border-solid ${
                  data?.charge_customers
                    ? "border-white"
                    : "border-greyed text-greyed"
                } rounded-xl text-center appearance-unset`}
                min={99}
                value={data?.amount?.category_6}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center">
            <div className="w-1/2 px-2">
              Regular song request amounts, from high to low-
            </div>
            <div className="w-1/2 text-center px-2">
              <div className="flex gap-2">
                <div className="w-1/4">
                  <input
                    type="number"
                    name="category_7"
                    className={`outline-none bg-transparent w-full px-3 py-2 border border-solid ${
                      data?.charge_customers
                        ? "border-white"
                        : "border-greyed text-greyed"
                    } rounded-xl appearance-unset`}
                    min={79}
                    value={data?.amount?.category_7}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <input
                    type="number"
                    name="category_8"
                    className={`outline-none bg-transparent w-full px-3 py-2 border border-solid ${
                      data?.charge_customers
                        ? "border-white"
                        : "border-greyed text-greyed"
                    } rounded-xl appearance-unset`}
                    min={59}
                    value={data?.amount?.category_8}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <input
                    type="number"
                    name="category_9"
                    className={`outline-none bg-transparent w-full px-3 py-2 border border-solid ${
                      data?.charge_customers
                        ? "border-white"
                        : "border-greyed text-greyed"
                    } rounded-xl appearance-unset`}
                    min={39}
                    value={data?.amount?.category_9}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <input
                    type="number"
                    name="category_10"
                    className={`outline-none bg-transparent w-full px-3 py-2 border border-solid ${
                      data?.charge_customers
                        ? "border-white"
                        : "border-greyed text-greyed"
                    } rounded-xl appearance-unset`}
                    min={19}
                    value={data?.amount?.category_10}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {data?.charge_customers && <Chart amounts={data?.amount || {}} />}

          <div className="mt-10">
            <button
              type="submit"
              className="bg-btn w-600px font-bold p-3 rounded-xl border border-solid border-btn hover:border-custom-border active:border-custom-border disabled:bg-greyed disabled:border-none"
              disabled={
                isSaving ||
                !data?.charge_customers ||
                data?.amount?.category_6 < 99 ||
                data?.amount?.category_7 < 79 ||
                data?.amount?.category_8 < 59 ||
                data?.amount?.category_9 < 39 ||
                data?.amount?.category_10 < 19
              }
            >
              {isSaving ? (
                <span className="mx-auto inline-block">
                  <Loading className="animate-spin w-6 inline-block me-2 mb-[2px]" />
                  <span>Saving</span>
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
