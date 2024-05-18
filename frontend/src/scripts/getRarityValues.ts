export default function getRarityValues(rarities){
    let rarityValues: string[] = [];
    rarities.forEach(rarity => {
        switch(rarity){
            case 'Common':
                rarityValues.push("C")
                break;
            case 'Uncommon':
                rarityValues.push("UC")
                break;
            case 'Rare':
                rarityValues.push("R")
                break;
            case 'Super rare':
                rarityValues.push("SR")
                break;
            case 'Secret':
                rarityValues.push("SC")
                break;
            case 'Promotional':
                rarityValues.push("P")
                break;
            case 'Leader':
                rarityValues.push("L")
                break;
        }
    });

    return rarityValues;
}