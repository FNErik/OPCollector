export default function getColorsFromElements(){
    const colorElements = Array.from(document.getElementsByClassName("selectedColorFilterElement"));
    let colors: string[] = [];
    colorElements.forEach(colorElement => {
        if(colorElement.textContent) colors.push(colorElement.textContent)
    });

    return colors
    
}