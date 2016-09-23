/* jshint node: true */
'use strict';

var DB = require('../Lib/DB');

/*

Example

const produit = new Product();
produit.setProductReference(productReference);
produit.retailer = retailer;
produit.url = url;
produit.setPictureURL(pictureUrl);
produit.brand = brand;
produit.setPrice(price);
produit.loadingMethod = loadingMethod;
produit.setWashCapacity(tableInfo['Capacité de lavage']);
produit.setWashVolume(tableInfo['Volume du tambour']);
produit.setSpinSpeed(tableInfo['Vitesse d\'essorage']);
produit.spinningRating = tableInfo['Qualité d\'essorage'];
produit.energyRating = tableInfo['Classe énergétique'];
produit.setEnergyConsumption(tableInfo['Consommation d\'énergie en lavage']);
produit.setWaterConsumption(tableInfo['Consommation d\'eau en lavage']);
produit.setWashingNoice(tableInfo['Niveau sonore en lavage']);
produit.setSpinningNoise(tableInfo['Niveau sonore en essorage']);
produit.scheduling = scheduling;
produit.madeIn = tableInfo['Origine de fabrication'];
produit.setPartsAvailability(tableInfo['Disponibilité des pièces détachées']);

*/


class Product {
  
  // --- CONSTRUCTOR ---
  constructor() {
    this.id = null;
    
    this.productReference = null; // - product brand after (title) - DB model
    this.retailer = null; // hard - DB retailer
    this.url = null; // hard - DB url
    
    this.createdAtDate = null; // db  - DB created_at
    this.updatedAtDate = null;  // db - DB updated_at
    this.lastCheckedDate = null; // db - DB checked_at 
    
    this.pictureUrl = null; // - darty_product_img - DB picture_url
    
    this.brand = null; // - product brand (title) - DB brand
    
    this.price = null; // - darty prix - DB price
    
    this.loadingMethod = null; // - product family (title) - DB loading_method
    this.washCapacity = null; // Capacité de lavage kg - table - DB wash_capacity
    this.washVolume = null; // Volume du tambour L - table - DB wash_volume
    
    this.spinSpeed = null; // Vitesse d'essorage - table - DB spin_speed
    this.spinningRating = null; // Qualite d'essorage - table - DB spinning_rating
    
    this.energyRating = null; // Classe energetique - table - DB energy_rating
    
    this.energyConsumption = null; // Consommation d'énergie en lavage - table - DB energy_consumption
    this.waterConsumption = null; // Consommation d'eau en lavage - table - DB water_consumption
    
    this.washingNoise = null; // Niveau sonore en lavage - table - DB wahsing_noise
    this.spinningNoise = null; // Niveau sonore en essorage - table - DB spinning_noise
    
    this.scheduling = null; // Départ différé || Fin différée - table - DB scheduling

    this.madeIn = null; // Origine de fabrication - table - DB made_in
    
    this.partsAvailability = null; // Disponibilité des pièces détachées - table - DB parts_availabity
    
    this.customerRating = null; // DB customer_rating
    this.customerReviews = null; // DB customer_reviews
  }
  
  // --- CUSTOM SETTER
  setProductReference(_productReference) {
    this.productReference = _productReference.trim().toLowerCase();
  }
  
  setBrand(_brand) {
    this.brand = _brand.trim().toLowerCase();
  }
  
  setPrice(_price) {
    if (typeof _price === 'string') {
      this.price = parseFloat(_price.replace(/\s+/g, '').replace('€', '.').replace(/,/, '.'));
    } else {
      this.price = _price;
    }
    if (isNaN(this.price)) { this.price = -1; }
  }
  
  setPictureURL(_url) {
    if (_url) {
      this.pictureUrl = _url.trim();
    } else {
      this.pictureUrl = null;
    }
  }
  
  setWashCapacity(_washCapacity = 'NA') {
    if (typeof _washCapacity === 'string') {
      this.washCapacity = parseFloat(_washCapacity.replace(/,/, '.'));
    } else {
      this.washCapacity = _washCapacity;
    }
    if (isNaN(this.washCapacity)) { this.washCapacity = -1; }
  }
  
  setWashVolume(_washVolume = 'NA') {
    if (typeof _washVolume === 'string') {
      this.washVolume = parseFloat(_washVolume.replace(/,/, '.'));
    } else {
      this.washVolume = _washVolume;
    }
    if (isNaN(this.washVolume)) { this.washVolume = -1; }
    
  }
  
  setSpinningRating(_spinningRating = 'NA') {
    this.spinningRating = _spinningRating;
    if (!this.spinningRating) { this.spinningRating = 'NA'; }
  }
  setEnergyRating(_energyRating = 'NA') {
    this.energyRating = _energyRating.split(' ')[0];
    if (!this.energyRating) { this.energyRating = 'NA'; }
  }
  
  setSpinSpeed(_spinSpeed = 'NA') {
    this.spinSpeed = parseInt(_spinSpeed, 10);
    if (isNaN(this.spinSpeed)) { this.spinSpeed = 0; }
  }
  
  setEnergyConsumption(_energyConsumption = 'NA') {
    this.energyConsumption = parseInt(_energyConsumption, 10);
    if (isNaN(this.energyConsumption)) { this.energyConsumption = -1; }
  }
  
  setWaterConsumption(_waterConsumption = 'NA') {
    this.waterConsumption = parseInt(_waterConsumption, 10);
    if (isNaN(this.waterConsumption)) { this.waterConsumption = -1; }
  }
  
  setWashingNoice(_washingNoise = 'NA') {
    this.washingNoise = parseInt(_washingNoise, 10);
    if (isNaN(this.washingNoise)) { this.washingNoise = 0; }
  }
  
  setSpinningNoise(_spinningNoise = 'NA') {
    this.spinningNoise = parseInt(_spinningNoise, 10);
    if (isNaN(this.spinningNoise)) { this.spinningNoise = 0; }
  }
  
  setMadeIn(_madeIn = 'NA') {
    this.madeIn = _madeIn;
    if (!this.madeIn) { this.madeIn = 'NA'; }
  }
  
  setPartsAvailability(_partsAvailability = 'NA') {
    if (_partsAvailability !== 'NA') {
      if (typeof _partsAvailability === 'string') {
        try {
          this.partsAvailability = parseInt(_partsAvailability.match(/\d/g).join(''), 10);
        } catch (e) {
          console.log('error:', e);
          this.partsAvailability = -1;
        }
        
      } else {
        this.partsAvailability = parseInt(_partsAvailability, 10);
      }
      
    } else {
      this.partsAvailability = -1;
    } 
  }
  
  
  setCustomerRating(customerRating = 'NA') {
    if (typeof customerRating === 'string') {
      this.customerRating = parseFloat(customerRating.replace(/,/, '.'));
    } else {
      this.customerRating = customerRating;
    }
    if (isNaN(this.customerRating)) { this.customerRating = -1; }
  }
  
  setCustomerReviews(customerReviews = 'NA') {
    this.customerReviews = parseInt(customerReviews, 10);
    if (isNaN(this.customerReviews)) { this.customerReviews = -1; }
  }
  // -- Method c
  
  toDBObject() {
    return {
      model: this.productReference, 
      retailer: this.retailer,   
      url: this.url,
      picture_url: this.pictureUrl,
      brand: this.brand,  
      price: this.price,
      loading_method: this.loadingMethod,
      wash_capacity: this.washCapacity, 
      wash_volume: this.washVolume, 
      spin_speed: this.spinSpeed, 
      spinning_rating: this.spinningRating, 
      energy_rating: this.energyRating, 
      energy_consumption: this.energyConsumption, 
      water_consumption: this.waterConsumption, 
      washing_noise: this.washingNoise, 
      spinning_noise: this.spinningNoise, 
      scheduling: this.scheduling, 
      made_in: this.madeIn,
      parts_availabity: this.partsAvailability,
      customer_rating: this.customerRating,
      customer_reviews: this.customerReviews,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      checked_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
  }
  
  toDBUpdate() {
    return { 
      url: this.url,
      picture_url: this.pictureUrl,
      price: this.price,
      loading_method: this.loadingMethod,
      wash_capacity: this.washCapacity, 
      wash_volume: this.washVolume, 
      spin_speed: this.spinSpeed, 
      spinning_rating: this.spinningRating, 
      energy_rating: this.energyRating, 
      energy_consumption: this.energyConsumption, 
      water_consumption: this.waterConsumption, 
      washing_noise: this.washingNoise, 
      spinning_noise: this.spinningNoise, 
      scheduling: this.scheduling, 
      made_in: this.madeIn,
      parts_availabity: this.partsAvailability,
      customer_rating: this.customerRating,
      customer_reviews: this.customerReviews,
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      checked_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
  }
  
  toDBChecked() {
    return { 
      checked_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
  }
  
  persist() {
    const db = new DB();
    return db.insert('produit', this.toDBObject());
  }
  
  update() {
    const db = new DB();
    return db.updateProduct(this);
  }
  
  check() {
    const db = new DB();
    return db.checkProduct(this);
  }
  
  getDataFromDB() {
    const db = new DB();
    const object = db.select('produit', `\`model\`= "${this.productReference}"
      AND \`brand\`= "${this.brand}"
      AND \`retailer\`= "${this.retailer}"
      `);
    return object;
  }
  
  static getProductsFromDB() {
    const db = new DB();
    return db.select('produit');
  }
  
  static create(caracteristic) {
    const produit = new Product();
    produit.setProductReference(caracteristic.productReference);
    produit.retailer = caracteristic.retailer;
    produit.url = caracteristic.url;
    produit.setPictureURL(caracteristic.pictureUrl);
    produit.setBrand(caracteristic.brand);
    produit.setPrice(caracteristic.price);
    produit.loadingMethod = caracteristic.loadingMethod;
    produit.setWashCapacity(caracteristic.washCapacity);
    produit.setWashVolume(caracteristic.washVolume);
    produit.setSpinSpeed(caracteristic.spinSpeed);
    produit.setSpinningRating(caracteristic.spinningRating);
    produit.setEnergyRating(caracteristic.energyRating);
    produit.setEnergyConsumption(caracteristic.energyConsumption);
    produit.setWaterConsumption(caracteristic.waterConsumption);
    produit.setWashingNoice(caracteristic.washingNoise);
    produit.setSpinningNoise(caracteristic.spinningNoise);
    produit.scheduling = caracteristic.scheduling;
    produit.setMadeIn(caracteristic.madeIn);
    produit.setPartsAvailability(caracteristic.partsAvailability);
    produit.setCustomerRating(caracteristic.customerRating);
    produit.setCustomerReviews(caracteristic.customerReviews);
    return produit;
  }
  
  static createFromDB(caracteristic) {
    
    const produit = new Product();
    produit.setProductReference(caracteristic.model);
    produit.retailer = caracteristic.retailer;
    produit.url = caracteristic.url;
    produit.setPictureURL(caracteristic.picture_url);
    produit.setBrand(caracteristic.brand);
    produit.setPrice(caracteristic.price);
    produit.loadingMethod = caracteristic.loading_method;
    produit.setWashCapacity(caracteristic.wash_capacity);
    produit.setWashVolume(caracteristic.wash_volume);
    produit.setSpinSpeed(caracteristic.spin_speed);
    produit.setSpinningRating(caracteristic.spinning_rating);
    produit.setEnergyRating(caracteristic.energy_rating);
    produit.setEnergyConsumption(caracteristic.energy_consumption);
    produit.setWaterConsumption(caracteristic.water_consumption);
    produit.setWashingNoice(caracteristic.washing_noise);
    produit.setSpinningNoise(caracteristic.spinning_noise);
    produit.scheduling = caracteristic.scheduling;
    produit.setMadeIn(caracteristic.made_in);
    produit.setPartsAvailability(caracteristic.parts_availabity);
    produit.setCustomerRating(caracteristic.customer_rating);
    produit.setCustomerReviews(caracteristic.customer_reviews);
    return produit;
  }
  
  static diff(p1, p2) {
    
    const diff = {};
    const toCompare = [
      'url',
      'pictureUrl',
      'price',
      'loadingMethod',
      'washCapacity',
      'washVolume',
      'spinSpeed',
      'spinningRating',
      'energyRating',
      'energyConsumption',
      'waterConsumption',
      'washingNoise',
      'spinningNoise',
      'scheduling',
      'madeIn',
      'partsAvailability',
      'customerRating',
      'customerReviews'
    ];
    
    for (var i = 0; i < toCompare.length; i++) {
      if (p1[toCompare[i]] !== p2[toCompare[i]]) { 
        console.log('p1', p1[toCompare[i]]);
        console.log('p2', p2[toCompare[i]]);
        diff[toCompare[i]] = p1[toCompare[i]];
      }
    }
    return diff;
    
  }
  
  static getBrandsFromDB() {
    const db = new DB();
    return db.query('SELECT DISTINCT brand from `produit`');
  }
  
  static getCountriesFromDB() {
    const db = new DB();
    return db.query('SELECT DISTINCT made_in from `produit`');
  }
  
}

module.exports = Product;
