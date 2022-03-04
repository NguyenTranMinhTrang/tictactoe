import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import bg from './assets/bg.jpeg';

export default function App() {
  const [data, setData] = React.useState([
    ['o', 'o', 'o'],
    ['o', 'x', 'o'],
    ['x', 'o', 'x'],
  ])

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>

        <View
          style={{
            width: '88%',
            aspectRatio: 1,
          }}
        >
          {
            data.map((row) => (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,

                }}
              >
                {
                  row.map((cell) => (
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      {
                        (cell === 'o') && (
                          <View style={styles.circel} />
                        )
                      }

                      {
                        (cell === 'x') && (
                          <View style={styles.cross}>
                            <View style={styles.crossLine} />
                            <View style={[styles.crossLine, styles.crossLineReversed]} />
                          </View>
                        )
                      }
                    </View>

                  ))
                }
              </View>
            ))
          }
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242D34',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  circel: {
    flex: 1,
    borderRadius: 58,
    borderWidth: 18,
    borderColor: 'white',
    margin: 10
  },
  cross: {
    flex: 1
  },
  crossLine: {
    position: 'absolute',
    left: '48%',
    width: 10,
    height: '100%',
    backgroundColor: 'white',
    transform: [{
      rotate: '45deg'
    }],
    borderRadius: 5
  },

  crossLineReversed: {
    transform: [{
      rotate: '-45deg'
    }]
  }
});
