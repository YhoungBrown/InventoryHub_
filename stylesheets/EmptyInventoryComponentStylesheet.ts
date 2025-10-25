import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'transparent',
        padding: 16
    },
    emptyStateImage: {
        width: '100%',
        height: height * 0.4,
        marginTop: 20,
    },
    emptyInventoryText: {
        marginTop: 3,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
    },
    ImageContainer: {
        width: '100%', 
        alignItems: 'center', 
        backgroundColor: 'transparent', 
        alignSelf: 'center'
    },
    emptyInventoryTextUsername: {
        textAlign: 'center',
        marginTop: 150,
    },
});

export default styles;
