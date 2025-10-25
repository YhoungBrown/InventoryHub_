import { Dimensions, StyleSheet } from "react-native";

const {height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    activityIndicator: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: height * 0.4,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    textBodyContainer: {
        flex: 1,
        paddingBottom: 100,
        backgroundColor: 'transparent'
    },
    contentContainer: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    productName: {
        flex: 1,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    quantity: {
        fontSize: 16,
        marginBottom: 15,
    },
    description: {
        fontSize: 13,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        left: 15,
        right: 15,
        gap: 12,
        backgroundColor: 'transparent'
    },
    editButtonTouchableOpacity: {
        flex: 1,
    },
    editButton: {
        backgroundColor: '#4B006E',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    deleteButtonTouchableOpacity: {
        flex: 1,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 30,
        borderRadius: 20,
        width: '85%',
        maxHeight: '70%',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
        backgroundColor: 'transparent'
    },
    modalButton: {
        flex: 1,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#999',
    },
})

export default styles