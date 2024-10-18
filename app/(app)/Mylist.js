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
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        if (user && user.myList) {
            setMyList(user.myList);
            setFilteredList(user.myList);
        }
    }, [user]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = myList.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredList(filtered);
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

    const handleSearchPress = () => {
        setIsSearchVisible(!isSearchVisible);
        if (!isSearchVisible) {
            setSearchQuery('');
            setFilteredList(myList);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
        },
        contentContainer: {
            flex: 1,
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
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#6666ff',
        },
        searchButton: {
            padding: 10,
        },
        listContainer: {
            paddingTop: 60, // ปรับค่านี้ให้มากกว่าความสูงของ header
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
        searchInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f0f0ff',
            borderRadius: 10,
            borderWidth: isFocused ? 1 : 0,
            borderColor: '#6666ff',
            marginHorizontal: 20,
            marginBottom: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        searchIcon: {
            marginRight: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 20,
            color: '#333',
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
                            styles.listContainer,
                            isSearchVisible && { paddingTop: 130 } // ปรับ paddingTop เมื่อแสดงช่องค้นหา
                        ]}
                    />
                ) : (
                    <View style={[styles.emptyContainer, { marginTop: isSearchVisible ? 160 : 110 }]}>
                        <Ionicons name="film-outline" size={80} color="#6666ff" />
                        <Text style={styles.emptyText}>คุณยังไม่มีภาพยนตร์ในรายการของคุณ</Text>
                        <TouchableOpacity style={styles.exploreButton}>
                            <Text style={styles.exploreButtonText}>สำรวจภาพยนตร์</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
            <BlurView intensity={80} tint="light" style={styles.headerBlur}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My List</Text>
                    <TouchableOpacity onPress={handleSearchPress} style={styles.searchButton}>
                        <Ionicons name={isSearchVisible ? "close" : "search"} size={24} color="#6666ff" />
                    </TouchableOpacity>
                </View>
                {isSearchVisible && (
                    <View style={styles.searchInputContainer}>
                        <Ionicons name="search" size={20} color="#6666ff" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="ค้นหาในรายการของฉัน"
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={handleSearch}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                )}
            </BlurView>
        </View>
    );
}
