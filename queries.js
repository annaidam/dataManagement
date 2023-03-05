/*This exercise is based on information from Lecture 12. You can get started with this exercise immediately
after the eleventh lecture.
Write the following queries against the conferences-and-delegates database with the conferences and
delegates collections you imported. Use the query-by-example API (i.e., db.<collection>.find() and
its variants3) in the mongo shell. You may need to refer to the documentation of MongoDB to assemble
the queries.
3.1 Count how many conferences there are in the database.
3.2 Find all conferences, and return only the name and _id fields.
3.3 Find all conferences with a practitioner-oriented track (i.e., where the track topic is “practice”).
3.4 Change the general chair of the MSR’16 conference to Gregg Rothermel.
3.5 Remove the city information from all conferences in India.
Submission Information
Create a simple text file called queries.js containing all queries. Use comments in the style // Question<number>
to mark each query. Do not just append your queries to the PDF file.*/

// Question 3.1
db.conferences.count();

// Question 3.2
db.conferences.find({}, { name: 1, _id: 1 });

//Question 3.3
db.conferences.find({ tracks: { $elemMatch: { topic: "practice" } } }).pretty();

//Question 3.4 Change the general chair of the MSR’16 conference to Gregg Rothermel.
db.conferences.update(
  { name: "MSR'16" },
  { $set: { general_chair: "Gregg Rothermel" } }
);

//Question 3.5 Remove the city information from all conferences in India.
db.conferences.remove({ location: { $elemMatch: { country: "India" } } });

db.conferences.aggregate([
  {
    $cond: [
      { $elemMatch: ["$location", "India"] },
      { $elemMatch: ["$city", null] },
      { $elemMatch: ["$city", "$city"] },
    ],
  },
]);
