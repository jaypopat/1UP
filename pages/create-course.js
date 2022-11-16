import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// import Alert from "../components/Alert";
import Header from "../components/Header";
import connectToContract from "../utils/primeroContract";
// import getRandomImage from "../utils/getRandomImage";

export default function CreateCourse() {
  const { data: account } = useAccount();

  //   const [eventName, setEventName] = useState("");
  //   const [eventDate, setEventDate] = useState("");
  //   const [eventTime, setEventTime] = useState("");
  //   const [maxCapacity, setMaxCapacity] = useState("");
  //   const [refund, setRefund] = useState("");
  //   const [eventLink, setEventLink] = useState("");
  //   const [eventDescription, setEventDescription] = useState("");

  //   const [success, setSuccess] = useState(null);
  //   const [message, setMessage] = useState(null);
  //   const [loading, setLoading] = useState(null);
  //   const [eventID, setEventID] = useState(null);

  //   async function handleSubmit(e) {
  //     e.preventDefault();

  //     const body = {
  //       name: eventName,
  //       description: eventDescription,
  //       link: eventLink,
  //       image: getRandomImage(),
  //     };

  //     try {
  //       const response = await fetch("/api/store-event-data", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       });
  //       if (response.status !== 200) {
  //         alert("Oops! Something went wrong. Please refresh and try again.");
  //       } else {
  //         console.log("Form successfully submitted!");
  //         let responseJSON = await response.json();
  //         await createEvent(responseJSON.cid);
  //       }
  //       // check response, if success is false, dont take them to success page
  //     } catch (error) {
  //       alert(
  //         `Oops! Something went wrong. Please refresh and try again. Error ${error}`
  //       );
  //     }
  //   }

  const createCourse = async () => {
    try {
      const primeroContract = connectToContract();

      if (primeroContract) {
        let deposit = ethers.utils.getAddress(account);

        const txn = await primeroContract.listCourse(
          eventTimestamp,
          deposit,
          maxCapacity,
          eventDataCID,
          { gasLimit: 900000 }
        );

        setLoading(true);
        console.log("Minting...", txn.hash);
        let wait = await txn.wait();
        console.log("Minted -- ", txn.hash);

        setEventID(wait.events[0].args[0]);
        setSuccess(true);
        setLoading(false);
        setMessage("Your event has been created successfully.");
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage(`There was an error creating your event: ${error.message}`);
      setLoading(false);
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     // disable scroll on <input> elements of type number
  //     document.addEventListener("wheel", (event) => {
  //       if (document.activeElement.type === "number") {
  //         document.activeElement.blur();
  //       }
  //     });
  //   });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <Head>
        <title>Create your event | web3rsvp</title>
        <meta
          name="description"
          content="Create your virtual event on the blockchain"
        />
      </Head> */}
      <Header></Header>
      <section className="relative py-12">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-4">
          Submit a Course
        </h1>

        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="eventname"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="event-name"
                  name="event-name"
                  type="text"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="eventname"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Course name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="event-name"
                  name="event-name"
                  type="text"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  required
                  value
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="eventname"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Course price
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="event-name"
                  name="event-name"
                  type="text"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Course description
                <p className="mt-2 text-sm text-gray-400">
                  Let people know what your course is about!
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={10}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="max-capacity"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Max capacity of students
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  Limit the number of students for your course (optional).
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="max-capacity"
                  id="max-capacity"
                  min="1"
                  placeholder="100"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                  value
                />
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <Link href="/">
                <a className="bg-white py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </a>
              </Link>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
