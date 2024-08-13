require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Thomas Edison',
    age: 50,
    favoriteFoods: ['salad', 'bread']
  });

  person.save(done);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done);
};

const findPeopleByName = (personName, done) => {
  return Person.find({ name: personName }, done);
};

const findOneByFood = (food, done) => {
  return Person.findOne({ favoriteFoods: [food] }, done);
};

const findPersonById = (personId, done) => {
  return Person.findById({ _id: personId }, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, person) {
      if (err) return done(err);
      done(null, person);
    });
  });

  // document.markModified('edited-field')
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, person) {
      if (err) return done(err);
      done(null, person);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, done);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
