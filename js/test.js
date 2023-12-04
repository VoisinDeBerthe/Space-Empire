
var data;
var db;
var text = 'toto';
// This is what our customer data looks like.
const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];




const dbName = "55";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {
    // Handle errors.
};
request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (event) => {
        // Store values in the newly created objectStore.
        const customerObjectStore = db
            .transaction("customers", "readwrite")
            .objectStore("customers");
        customerData.forEach((customer) => {
            customerObjectStore.add(customer);
        });
    };
};


const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
    if (entry.type === "reload") {
        console.log(`${entry.name} was reloaded!`);
        console.log(entry);
        getData();
    }
});


function getData() {

    indexedDB.open(dbName, 2).onsuccess = (event) => {
        db = event.target.result;
        const transaction = db.transaction(["customers"]);
        const objectStore = transaction.objectStore("customers");
        const request = objectStore.get("444-44-4444");
        request.onerror = (event) => {
            // Handle errors!
        };
        request.onsuccess = (event) => {
            // Do something with the request.result!
            console.log(`Name for SSN 444-44-4444 is ${request.result.name}`);
            data = request.result;
            maj();
        };

    };


}


function updateData() {

    indexedDB.open(dbName, 2).onsuccess = (event) => {
        db = event.target.result;
        const transaction = db.transaction(["customers"], "readwrite");
        const objectStore = transaction.objectStore("customers");
        const request = objectStore.get("444-44-4444");
        request.onerror = (event) => {
            // Handle errors!
        };
        request.onsuccess = (event) => {
            // Do something with the request.result!
            console.log(`Name for SSN 444-44-4444 is ${request.result.name}`);
            data = request.result;
            data.name = text;

            const requestUpdate = objectStore.put(data);
            requestUpdate.onerror = (event) => {
                // Do something with the error
            };
            requestUpdate.onsuccess = (event) => {
                console.log('success');
            };
        };
    };
    RedirectionJavascript();


}

function maj() {
    alert(data.name);
    document.getElementById('test-bt').title = data.name;
}

text = 'titi';

function RedirectionJavascript() {
    document.location.href = "test2.html";
}