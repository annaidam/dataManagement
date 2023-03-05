// Question 3.1
db.conferences.count();

// Question 3.2
db.conferences.find({}, { name: 1, _id: 1 });

//Question 3.3
db.conferences.find({ tracks: { $elemMatch: { topic: "practice" } } }).pretty();

//Question 3.4
db.conferences.update(
  { name: "MSR'16" },
  { $set: { general_chair: "Gregg Rothermel" } }
)

//Question 3.5
db.conferences.update(
  { location: { $elemMatch: { country: "India" } } },
  { $set: { location: { city: null } } }
)
