const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const sqlQuery =`
  SELECT * 
  FROM users
  WHERE email = $1`;
  const values = [email];
  
  return pool
    .query(sqlQuery, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const sqlQuery =`
  SELECT * 
  FROM users
  WHERE id = $1`;
  const values = [id];
  
  return pool
    .query(sqlQuery, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    });
  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  const { name, email, password } = user;
  const sqlQuery = `
  INSERT INTO users
    (name, email, password)
  VALUES 
    ( $1, $2, $3)
  RETURNING *`;

  return pool
  .query(sqlQuery, [name, email, password])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    });
   
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const sqlQuery =`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`
  const values = [guest_id, limit];
  
  return pool
    .query(sqlQuery, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      return null;
    });

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
  

  const queryParams = [];
   
   let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;
 
   
   if (options.city) {
     queryParams.push(`%${options.city}%`);
     queryString += `WHERE city LIKE $${queryParams.length} `;
   }

   if (options.owner_id ) {
     queryParams.push(options.owner_id);

    if (!queryParams) {
      queryParams.push(options.owner_id);
      queryString += `WHERE owner_id = $${queryParams.length} `;
    } else {
      queryString += `AND owner_id = $${queryParams.length} `;
    }
  }

   if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);

    if (!queryParams){
      queryString += `WHERE cost_per_night > $${queryParams.length} `;
    } else {
      queryString += `AND cost_per_night > $${queryParams.length} `;
    }
    
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);

    if (!queryParams){
      queryString += `WHERE cost_per_night < $${queryParams.length } `;
    } else {
      queryString += `AND cost_per_night < $${queryParams.length } `;
    }
    
  }
   

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    HAVING avg(property_reviews.rating) >= $${queryParams.length -1} 
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  } else {
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
     ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

 
   return pool.query(queryString, queryParams).then((res) => res.rows);
 
  
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  const {  owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms } = property;


  const sqlQuery = `
  INSERT INTO properties
    ( owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms)
  VALUES 
    ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *`;

  return pool
  .query(sqlQuery, [owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms])
    .then(result => {
      console.log(result.rows[0]);
    })
    .catch(err => {
      return null;
    });
  


}
exports.addProperty = addProperty;


/**
 * Add a reservation to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addReservation = function(reservation) {

  const sqlQuery = `
  INSERT INTO reservations
  (start_date,
  end_date,
  property_id,
  guest_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  

  return pool
  .query(sqlQuery, 
    [reservation.start_date,
     reservation.end_date,
     reservation.property_id,
     reservation.guest_id])
    .then(result => result.rows)
    
}
exports.addReservation = addReservation;

