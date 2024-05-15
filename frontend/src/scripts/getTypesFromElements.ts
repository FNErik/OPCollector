export default function getTypesFromElements(){
    const typeElements = Array.from(document.getElementsByClassName("selectedTypeFilterElement"));
    let types: string[] = [];
    typeElements.forEach(typeElement => {
        if(typeElement.textContent) types.push(typeElement.textContent)
    });

    return types
}