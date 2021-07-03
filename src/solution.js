module.exports = {
  prepareData: function(payload, year = 2018, company = 'NASA') {
    return payload.filter(({ launch_date_utc, rocket: { second_stage: { payloads } }}) => {
      const is2018 = (new Date(launch_date_utc)).getUTCFullYear() === year;
      const isNASA = payloads.map(({ customers }) => customers).join().includes(company);
      return is2018 && isNASA;
    })
    .sort(function(a, b) {
      return b.rocket.second_stage.payloads.length - a.rocket.second_stage.payloads.length
        || new Date(b.launch_date_utc) - new Date(a.launch_date_utc);
    })
    .map(({ flight_number, mission_name, rocket: { second_stage: { payloads } }}) => ({
      flight_number,
      mission_name,
      payloads_count: payloads.length
    }))
  },
  renderData: function (payload) {
    document.getElementById('out').innerHTML = JSON.stringify(payload, null, '  ');
  }
};