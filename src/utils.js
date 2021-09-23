import { PAYLOAD_CUSTOMERS } from './constants';

// fetch utils
const fetchData = async (url) => await (await fetch(url)).json();

// api data utils
const checkDateForDesiredLaunchYear = desiredYear =>
  launchUTCDate => (new Date(launchUTCDate)).getUTCFullYear() === desiredYear;
const checkDateFor2018LaunchYear = checkDateForDesiredLaunchYear(2018);

const checkLaunchPayloadCustomer = customer => customers => customers.includes(customer);
const checkNASAPayload = checkLaunchPayloadCustomer(PAYLOAD_CUSTOMERS.NASA);

// sort utils
const sortByPayload = (a, b) => b.rocket.second_stage.payloads.length - a.rocket.second_stage.payloads.length;
const sortByLaunchDate = (a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc);

export {
  fetchData,
  checkDateFor2018LaunchYear,
  checkNASAPayload,
  sortByPayload,
  sortByLaunchDate
}