import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_PADDING = 15;



export const ITEM_HEIGHT = 40 + 199 + 119; 

export const ITEM_MARGIN_TOP = 40;

const styles = StyleSheet.create({
    parent: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        width: CARD_WIDTH,
        marginTop: 40,
    },
    cardContainer: {
        width: '100%',
        borderRadius: 16,
        borderWidth: 1.5,
        elevation: 8,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    cardImageContainer: {
        padding: CARD_PADDING,
        paddingBottom: 4,
        backgroundColor: 'transparent'
    },
    cardImage: {
        width: '100%',
        height: 180,
        backgroundColor: 'transparent',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    cardContent: {
        padding: CARD_PADDING,
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 3,
    },
    price: {
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 3,
    },
    description: {
        fontSize: 14,
    }
})

export default styles;