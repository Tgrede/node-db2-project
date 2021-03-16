
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '3D7KS29C77G767447', make: 'ford', model: 'focus', mileage: '123123'}
      ]);
    });
};
