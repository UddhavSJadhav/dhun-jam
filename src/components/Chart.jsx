/* eslint-disable react/prop-types */
const Chart = ({ amounts }) => {
  const highestAmount = Object.values(amounts)
    .sort((a, b) => a - b)
    .pop();

  const getHeight = (x) => (220 / highestAmount) * x;

  return (
    <div className="mt-5 flex gap-4">
      <div className="text-4xl">₹</div>
      <div className="flex-grow h-60 border-s border-b border-solid border-white relative ps-4">
        <div className="flex gap-14 items-baseline absolute -bottom-5">
          <div className="w-12">
            <div
              className="bg-graph-bar w-6 mx-auto rounded-sm"
              style={{ height: `${getHeight(amounts?.category_6)}px` }}
            ></div>
            <p className="text-xs mt-1">Custom</p>
          </div>
          <div className="w-12">
            <div
              className="bg-graph-bar w-6 mx-auto rounded-sm"
              style={{ height: `${getHeight(amounts?.category_7)}px` }}
            ></div>
            <p className="text-xs mt-1">Category1</p>
          </div>
          <div className="w-12">
            <div
              className="bg-graph-bar w-6 mx-auto rounded-sm"
              style={{ height: `${getHeight(amounts?.category_8)}px` }}
            ></div>
            <p className="text-xs mt-1">Category2</p>
          </div>
          <div className="w-12">
            <div
              className="bg-graph-bar w-6 mx-auto rounded-sm"
              style={{ height: `${getHeight(amounts?.category_9)}px` }}
            ></div>
            <p className="text-xs mt-1">Category3</p>
          </div>
          <div className="w-12">
            <div
              className="bg-graph-bar w-6 mx-auto rounded-sm"
              style={{ height: `${getHeight(amounts?.category_10)}px` }}
            ></div>
            <p className="text-xs mt-1">Category4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
