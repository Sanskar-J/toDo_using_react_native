import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';

// const STORAGE_KEY='@save_name';
let bg={ uri: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" };
export default function App() {
  const [task,setTask]=useState();
  const [taskItems,setTaskItems]=useState([]);
  

  useEffect(async() => {
    let data=await AsyncStorage.getItem('@Tasks:key');
    if(data==null)
    data=JSON.stringify([]);
    setTaskItems(JSON.parse(data));
    // console.log('i ran')
}, [])
  const handleAddTask=async()=>{
    // console.log(AsyncStorage);
    if(task != undefined)
    {
    
    // let data= await AsyncStorage.getItem(ind);
    // AsyncStorage.setItem('index',ind);

    // ind++;
    // console.log(data,ind)
    Keyboard.dismiss();
    let itemsCopy=[...taskItems,task];
    setTaskItems([...taskItems,task]);
    AsyncStorage.setItem('@Tasks:key',JSON.stringify(itemsCopy));

    setTask(null);
    }
  }
  const completeTask=(index)=>{
    let itemsCopy=[...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem('@Tasks:key',JSON.stringify(itemsCopy));
  }
  const finishedTask=(index)=>{
    style=StyleSheet.create({
      addText:{
        color:'black'
      }
    });
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <View style={styles.heading}>
        <Text style={styles.textComponent}>"[TODO-CHAN]"</Text>
        </View>
    {/* Write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS==="ios"? "padding":"height"}
      style={styles.writeTask}
      >
        <TextInput style={styles.input} placeholder="Write a Task" value={task} onChangeText={text=>setTask(text)} />
        <TouchableOpacity onPress={()=> handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {/* Task goes here */}
          {
            taskItems.map((item,index)=>{
              return (
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                  <Task  text={item} />
                </TouchableOpacity>
              )
            })
          }
          {/* <Task />
          <Task />
          <Task /> */}
        </View>
        
      </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#405d27",
  },
  tasksWrapper: {
    top:60,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  heading:{
    backgroundColor:'rgba(0,0,0,0.5)',
    shadowOpacity:1
  },
  textComponent: {
    paddingTop:60,
    paddingBottom:20,
    paddingHorizontal:20,
    fontSize: 24,
    textAlign:'center',
    fontWeight: "bold",
    color: "white",
    fontFamily:"Comic Sans MS",
  },
  items: {
    marginTop: 30,
  },
  writeTask: {
    position:'absolute',
    top:150,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input: {
    paddingVertical:15,
    paddingHorizontal:15,
    width:300,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderTopLeftRadius :60,
    borderBottomLeftRadius :60,
    borderColor:'#86af49',
    borderWidth:1,
    fontFamily:"Comic Sans MS"

  },
  addWrapper: {
    width:90,
    height:60,
    backgroundColor:'#86af49',
    borderTopRightRadius:60,
    borderBottomRightRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#86af40',
    borderWidth:1
  },
  addText: {
    color:'white',
    fontSize:30,
    paddingBottom:10,
    fontWeight:'bold',
    textAlign:'center'
  },
  image:{
    flex:1,
  },
});
