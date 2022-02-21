// Please implement your solution in this file

const launchDataToDTO = (data) => {
  const filteredData = data.filter(({ launch_year, rocket }) => {
    const customers = rocket.second_stage.payloads.map(({ customers }) => customers).flat();
    const result = customers.some((item) => item.includes("NASA")) && launch_year === "2018";
    return result;
  });

  const sortedDataByFlightNumber = filteredData.sort((a, b) =>
    a.flight_number > b.flight_number ? -1 : 1
  );

  const sortedDataByPayloadsCount = sortedDataByFlightNumber.sort((a, b) =>
    a.rocket.second_stage.payloads.length >
    b.rocket.second_stage.payloads.length
      ? -1
      : 1
  );

  const formattedData = sortedDataByPayloadsCount.map((item) => ({
    mission_name: item.mission_name,
    flight_number: item.flight_number,
    payloads_count: item.rocket.second_stage.payloads.length,
  }));

  return formattedData;
};

const renderProp = ([key, value], index, length) => {
  const isLast = index === length - 1;
  const symbol = isLast ? "" : ",";
  const newValue = typeof value === "string" ? `"${value}"` : value;

  return `    "${key}": ${newValue}${symbol}`;
};

const renderObj = (obj) => {
  const start = "  {";
  const end = "  }";
  const props = Object.entries(obj).map((item, idx, arr) => renderProp(item, idx, arr.length));

  return [start, ...props, end].join("\n");
};

const renderData = (data) => {
  const start = "[";
  const end = "]";
  const block = document.querySelector("#out");
  block.innerHTML = [start, ...data.map(renderObj), end].join("\n");
};

module.exports = {
  prepareData: launchDataToDTO,
  renderData: renderData,
};
