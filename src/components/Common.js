const RemoveCharacters = (numberString) => {
    if (typeof numberString !== 'string') {
        return numberString;
    }

    // Kiểm tra xem chuỗi có chứa dấu phẩy hay không
    if (numberString.includes(',')) {
        const cleanedString = numberString.replace(/,/g, "");
        const number = parseFloat(cleanedString);
        return number;
    }

    // Nếu không có dấu phẩy, chuyển thẳng chuỗi thành số
    const number = parseFloat(numberString);
    return number;
};

export default RemoveCharacters;

function FormatNumber( numberString, max = 0, groupSeparator = ",", decimalSeparator = ".") {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
        throw new Error("Invalid number string");
    }
    const options = {
        minimumFractionDigits: 0,
        maximumFractionDigits: max,
        useGrouping: true,
    };
    const formattedNumber = number.toLocaleString("en-US", options);

    const customFormattedNumber = formattedNumber.replace(/,/g, groupSeparator).replace(/\./g, decimalSeparator);

    return customFormattedNumber;
}
export  {RemoveCharacters, FormatNumber};
