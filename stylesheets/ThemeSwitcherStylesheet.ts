import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',       
    top: 15,                    
    right: 10,                  
    paddingVertical: 10,          
    flexDirection: 'row',       
    alignItems: 'center',
    zIndex: 10,
    shadowRadius: 4,
        
  },
  text: {
    fontSize: 12,            
    marginRight: 4,
    fontWeight: '600',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], 
  },
})

export default styles