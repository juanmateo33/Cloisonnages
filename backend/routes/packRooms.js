function getRoomVector(code){
    switch(code){
        case 859:
        return ["859", "569", "570"];
        case 860:
        return ["860", "569", "570", "571"];
        case 914:
        return ["914", "570", "571"];
        case 847:
        return ["847", "420", "419"];
        case 849:
        return ["849", "614", "615"];
        case 850:
        return ["850", "612", "613"];
        case 851:
        return ["851", "611", "610"];
        case 848:
        return ["848", "414", "411"];
        case 858:
        return ["858", "413", "410"];
        case 857:
        return ["857", "412", "409"];
        case 852:
        return ["852", "469", "470"];
        case 846:
        return ["846", "463", "464"];
        case 854:
        return ["854", "465", "466"];
        case 853:
        return ["853", "467", "468"];
        case 856:
        return ["856", "471", "472"];
        case 855:
        return ["855", "473", "474"];
    };
    return [];
}

module.exports = { getRoomVector };