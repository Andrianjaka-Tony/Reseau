import { Link } from "./Link.js";

/**
 * @param {number} array
 * @returns {number}
 */
function minValue(array) {
  let ns = array.filter((n) => n >= 0);
  let response = ns[0];
  ns.forEach((n) => {
    if (n > -1 && response > n) {
      response = n;
    }
  });
  return response;
}

export class Adress {
  id;
  name;
  links;
  adresses;
  adressesPing;

  /**
   * @param {number} id
   * @param {string} name
   * @param {Link[]} links
   */
  constructor(id, name, links) {
    this.id = id;
    this.name = name;
    this.links = links;
    this.adresses = [];
    this.adressesPing = [];
  }

  /**
   * @param {Adress} adress
   * @param {number} ping
   */
  connect(adress, ping) {
    this.adresses.push(adress);
    this.adressesPing.push(ping);
  }

  /**
   * @param {number} id
   * @return {boolean}
   */
  isConnectedWith(id) {
    // * initialisation des tableaux
    let verified = [];
    let verify = [this];

    while (verify.length != 0) {
      // * Prendre l'adresse a verifier
      let adress = verify[0];
      // * Ajouter les adresses liées a l'adresse a vérifier dans le tableau des adresses a vérifier
      adress.adresses.forEach((a) => {
        // * Si l'adresse n'a pas encore été vérifiée
        if (!verified.includes(a)) {
          verify.push(a);
        }
      });

      // * Checker si le lien a rechercher est dans le tableau des liens de l'adresse a vérifier
      let idLinks = adress.links.map((link) => link.id);
      if (idLinks.includes(id)) {
        return true;
      }

      // * Ajouter l'adresse a vérifier dans le tableau des adresse deja vérifiées
      verified.push(adress);
      // * Enlever l'adresse qui a été verifiée dans la liste des adresse a vérifier
      verify = verify.filter((element) => element != adress);
    }

    return false;
  }

  /**
   * @return {number}
   */
  getPing(adress) {
    let index = this.adresses.indexOf(adress);
    return this.adressesPing[index];
  }

  /**
   * @param {Adress[]} verified
   * @param {Adress[]} pred
   */
  getValueFromPred(verified, pred) {
    let index = verified.indexOf(this);
    let adress = this;
    let predecessor = pred[index];
    let response = 0;
    while (predecessor != null) {
      response += predecessor.getPing(adress);
      index = verified.indexOf(predecessor);
      adress = predecessor;
      predecessor = pred[index];
    }
    return response;
  }

  /**
   * @param {number} id
   * @return {boolean}
   */
  hasLink(id) {
    return this.links.map((link) => link.id).includes(id);
  }

  /**
   * @param {Adress[]} verify
   * @param {Adress[]} verified
   * @param {Adress[]} pred
   * @return {void}
   */
  verification(verify, verified, pred) {
    while (verify.length != 0) {
      let adress = verify[0];
      verified.push(adress);
      adress.adresses.forEach((a) => {
        if (!verified.includes(a)) {
          pred.push(adress);
          verify.push(a);
        }
      });
      verify = verify.filter((element) => element != adress);
    }
  }

  /**
   * @param {Adress[]} verified
   * @param {Adress[]} pred
   * @param {number[]} values
   * @return {void}
   */
  initValues(verified, pred, values) {
    verified.forEach((v) => {
      values.push(v.getValueFromPred(verified, pred));
    });
  }

  /**
   * @param {Adress[]} verified
   * @param {Adress[]} pred
   * @param {number[]} values
   * @return {void}
   */
  verifyValues(verified, pred, values) {
    for (let i = 0; i < verified.length; i++) {
      verified.forEach((v, index) => {
        let adresses = v.adresses;
        adresses.forEach((a) => {
          let adressIndex = verified.indexOf(a);
          if (v.getPing(a) + values[index] < values[adressIndex]) {
            values[adressIndex] = v.getPing(a) + values[index];
            pred[adressIndex] = v;
          }
        });
      });
    }
  }

  /**
   * @param {Adress[]} verified
   * @param {number[]} values
   * @param {number} id
   * @return {void}
   */
  cleanValues(verified, values, id) {
    verified.forEach((v, index) => {
      if (v.hasLink(id)) {
        values[index] += v.links.filter((link) => link.id == id)[0].value;
      } else {
        values[index] = -1;
      }
    });
  }

  /**
   * @param {Adress[]} response
   * @param {Adress[]} verified
   * @param {Adress[]} pred
   * @param {number[]} values
   * @return {void}
   */
  findMinWay(response, verified, pred, values, value) {
    let index = values.indexOf(value);
    let adress = verified[index];
    let predecessor = pred[index];
    response.push(adress);
    if (predecessor != null) {
      response.push(predecessor);
    }
    while (predecessor != null) {
      index = verified.indexOf(predecessor);
      predecessor = pred[index];
      response.push(predecessor);
    }
    response.pop();
  }

  /**
   * @param {number} id
   */
  getWay(id) {
    let verify = [this];
    let verified = [];
    let pred = [null];
    let values = [];
    if (!this.isConnectedWith(id)) {
      return "Aucun chemin n'a été trouvé!";
    }
    this.verification(verify, verified, pred);
    this.initValues(verified, pred, values);
    this.verifyValues(verified, pred, values);
    this.cleanValues(verified, values, id);

    let response = [];
    let value = minValue(values);
    this.findMinWay(response, verified, pred, values, value);

    let responseData = {
      response,
      value,
    };
    return responseData;
  }
}
