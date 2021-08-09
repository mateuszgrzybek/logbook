import axios from "axios";

export const createNewEntry = async item => {
    let data = {
        pilotName: item.pilotName, // authorized user should be used here in future prod build
        depICAO: item.depICAO,
        arrICAO: item.arrICAO,
        depTimeZulu: item.depTimeZulu,
        arrTimeZulu: item.arrTimeZulu,
        flightTime: JSON.stringify(item.flightTime),
        aircraftICAO: item.aircraftICAO,
        aircraftRegistration: item.aircraftRegistration,
        planeSpottersPhotoSource: item.planeSpottersPhotoSource,
    };
    let request = {
        url: "http://localhost:3000/api/logbook", // domain should be used here in prod build
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const response = await axios(request);
    return response;
};

export const updateEntry = async item => {
    let data = {
        pilotName: item.pilotName, // authorized user should be used here in future prod build
        depICAO: item.depICAO,
        arrICAO: item.arrICAO,
        depTimeZulu: item.depTimeZulu,
        arrTimeZulu: item.arrTimeZulu,
        flightTime: JSON.stringify(item.flightTime),
        aircraftICAO: item.aircraftICAO,
        aircraftRegistration: item.aircraftRegistration,
        planeSpottersPhotoSource: item.planeSpottersPhotoSource,
    };
    let request = {
        url: "http://localhost:3000/api/logbook/" + item._id, // domain should be used here in prod build
        method: "put",
        headers: {
            "Content-type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const response = await axios(request);
    return response;
};

export const getAllEntries = async () => {
    let request = {
        url: "http://localhost:3000/api/logbook", // domain should be used here in prod build
        method: "get",
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios(request);
    return response;
};

export const deleteEntry = async item => {
    let request = {
        url: "http://localhost:3000/api/logbook/" + item._id, // domain should be used here in prod build
        method: "delete",
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios(request);
    return response;
};
