/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(url, type = '', name = '', templated = false, deprecation = false) {

    return {
        "href": url,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} terrainData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapTerrainToResourceObject(terrainData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/terrains' + '/' + terrainData.nom, 'string'),
            "terrains": halLinkObject(baseURL + '/terrains' , 'string'),
            "creneaux": halLinkObject(baseURL + '/terrains' + '/' + terrainData.nom + '/creneaux', 'string')
        }],

        "nom": terrainData.nom,
        "disponible": terrainData.disponible,
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} terrainData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapAdminTerrainToResourceObject(terrainData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/terrains' + '/' + terrainData.nom, 'string'),
            "Disponibilité d'un terrain": halLinkObject(baseURL + '/terrains/'  + terrainData.nom + '/disponible' , 'string'),
        }],

        "nom": terrainData.nom,
        "disponible": terrainData.disponible,
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} creneauData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapCreneauSelfToResourceObject(creneauData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/creneaux' + '/' + creneauData.id_creneau, 'string'),
        }],

        "Heure de début": creneauData.heure_debut,
        "Heure de fin": creneauData.heure_fin,
        "Jour": creneauData.jour,
        "disponible": creneauData.creneau_disponible,
        "Id du terrain": creneauData.id_terrain,
    
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} creneauData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapCreneauToResourceObject(creneauData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/creneaux' + '/' + creneauData.id, 'string'),
            "reservation": halLinkObject(baseURL + '/creneaux' + '/' + creneauData.id_creneau + '/reservation', 'string'),
            "creneaux": halLinkObject(baseURL + '/creneaux' , 'string')
        }],

        "Heure de début": creneauData.heure_debut,
        "Heure de fin": creneauData.heure_fin,
        "Jour": creneauData.jour,
        "disponible": creneauData.disponible,
        "Id du terrain": creneauData.id_terrain,
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} adherentData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapAdherentToResourceObject(adherentData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/adherent' + '/' + adherentData.id, 'string'),
            "adherents": halLinkObject(baseURL + '/adherents' , 'string')
        }],

        "Pseudo": adherentData.pseudo,
        "role": adherentData.role,
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} reservationData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapReservationToResourceObject(reservationData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/login/reservations' + '/' + reservationData.id_reservation, 'string'),
        }],

        "Heure de début": reservationData.heure_debut,
        "Heure de fin": reservationData.heure_fin,
        "Jour": reservationData.jour,
        "disponible": reservationData.creneau_disponible,
        "Nom du terrain": reservationData.nom,
        "disponible": reservationData.terrain_disponible,
        "Pseudo de l'adhérent": reservationData.pseudo,
        "Rôle de l'adhérent": reservationData.role,
    }
}

module.exports = { 
    halLinkObject, 
    mapTerrainToResourceObject, 
    mapCreneauToResourceObject, 
    mapCreneauSelfToResourceObject, 
    mapAdherentToResourceObject, 
    mapReservationToResourceObject,
    mapAdminTerrainToResourceObject, 
};
