import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    backgroundColor: 'transparent'
  },
  createButtonTouchableOpacity: {
    alignSelf: 'center',
  },
  createButton: {
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
  createText: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 14
  },
  formContainer: {
    padding: 25,
    backgroundColor: 'transparent'
  },
  activityIndicator: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;