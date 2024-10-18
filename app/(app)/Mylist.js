import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, TextInput, Image, Dimensions } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function Mylist() {
    const { user } = useAuth();
    const [myList, setMyList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        if (user && user.myList) {
            setMyList(user.myList);
            setFilteredList(user.myList);
        }
    }, [user]);
    const handleExplorePress = () => {
        navigation.navigate('Explore');
    };
    const handleMoviePress = (movie) => {
        navigation.navigate('DetailsAndPlay', { movie });
    };

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieItem}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.moviePoster}
                imageStyle={styles.moviePosterImage}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.gradientOverlay}
                >
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.imdbText}>IMDb</Text>
                            <Text style={styles.movieRating}>{item.vote_average.toFixed(1)}</Text>
                        </View>
                        <TouchableOpacity style={styles.playButton}>
                            <Ionicons name="play-circle-outline" size={24} color="#fff" />
                            <Text style={styles.playButtonText}>Play</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',

        },
        contentContainer: {
            flex: 1,
            marginTop: 100,
            marginBottom: 90,
        },
        listContainer: {

            paddingHorizontal: 10,
        },
        movieItem: {
            width: '47%',
            marginHorizontal: '1.5%',
            marginVertical: '1.5%',
            borderRadius: 15,
            overflow: 'hidden',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        moviePoster: {
            width: '100%',
            height: 250,
            justifyContent: 'flex-end',
        },
        moviePosterImage: {
            borderRadius: 15,
        },
        gradientOverlay: {
            height: '100%',
            justifyContent: 'flex-end',
            padding: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },
        movieInfo: {
            justifyContent: 'flex-end',
        },
        movieTitle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 5
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        imdbText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#f3ce13',
            marginRight: 5,
        },
        movieRating: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
        },
        playButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(102,102,255, 0.8)',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 15,
            alignSelf: 'flex-start',
        },
        playButtonText: {
            color: '#fff',
            fontSize: 14,
            marginLeft: 5,
            fontWeight: 'bold',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyText: {
            color: 'gray',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 30,
        },
        exploreButton: {
            backgroundColor: '#6666ff',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
        },
        exploreButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        headerBlur: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 50,
            paddingBottom: 10,
        },
        userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        profilePicture: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
        },
        defaultProfilePicture: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#6666ff',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        defaultProfilePictureText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        username: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#6666ff',
        },
        searchButton: {
            padding: 10,
        },
    });

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.contentContainer}>
                {filteredList.length > 0 ? (
                    <FlatList
                        data={filteredList}
                        renderItem={renderMovieItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={[
                            styles.listContainer
                        ]}
                    />
                ) : (
                    <View style={[styles.emptyContainer, { marginTop: 100 }]}>
                        <Ionicons name="film-outline" size={80} color="#6666ff" />
                        <Text style={styles.emptyText}>You don't have any movies in your list yet</Text>
                        <TouchableOpacity style={styles.exploreButton} onPress={handleExplorePress}>
                            <Text style={styles.exploreButtonText}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>

            <BlurView intensity={80} tint="light" style={styles.headerBlur}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        {user?.profilePicture ? (
                            <Image
                                source={{ uri: user.profilePicture }}
                                style={styles.profilePicture}
                            />
                        ) : (
                            <View style={styles.defaultProfilePicture}>
                                <Text style={styles.defaultProfilePictureText}>
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </Text>
                            </View>
                        )}
                        <Text style={styles.username}>My List</Text>
                    </View>
                    <TouchableOpacity style={styles.searchButton}>
                        <Ionicons name="search" size={24} color="#6666ff" />
                    </TouchableOpacity>
                </View>
            </BlurView>
        </View>
    );
}
