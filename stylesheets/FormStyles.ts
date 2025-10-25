import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
    activityIndicator: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    productNameContainer: {
        backgroundColor: 'transparent'
    },
    productname: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        
    },
    productnameTextInput: {
        padding: 12,
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 15,
        borderWidth: 1.5,
        fontSize: 15,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    priceTextInput: {
        padding: 12,
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 15,
        borderWidth: 1.5,
        fontSize: 15,
    },
    quantity : {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    quantityTextInput: {
        padding: 12,
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 15,
        borderWidth: 1.5,
        fontSize: 15,
    },
    description: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    descriptionTextInput: {
        padding: 12,
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 15,
        borderWidth: 1.5,
        fontSize: 15,
        minHeight: 100
    },
    productImage: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
})

export default styles;