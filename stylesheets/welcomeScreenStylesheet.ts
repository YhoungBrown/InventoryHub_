import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    welcomeTextContainer: {
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 20
    },
    welcomesubText: {
        fontSize: 12,
        marginBottom: 20,
        marginTop: -20
    },
    welcomeUsernameContainer: {
        padding: 24,
        borderRadius: 16,
        borderWidth: 1.5,
        paddingVertical: 40,
        elevation: 8,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        margin: 35
    },
    textInputTitle: {
        fontSize: 13,
        marginTop: 24,
        fontWeight: '600',
    },
    textInput: {
        padding: 14,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 2,
        fontSize: 16,
    },
    InventoryButtonTouchableOpacity: {
        alignSelf: 'center',
    },
    continueButton: {
        backgroundColor: '#4B006E',
        padding: 16,
        borderRadius: 12,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    activityIndicator: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default styles;