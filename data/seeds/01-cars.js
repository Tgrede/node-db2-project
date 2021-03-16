// STRETCH

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '5N1AT2MT2EC871947',
        make: 'chevy', 
        model:'equinox', 
        mileage: '123123'},
      ]);
    });
};
