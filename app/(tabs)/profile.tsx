import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const user = {
    name: 'Lakshita Meta',
    email: 'lakshita@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Enthusiastic developer. Loves React and TypeScript.',
};

export default function Profile() {
    const router = useRouter();

    const isLoggedIn = false;

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [isLoggedIn, router]);

    return (
        <View style={styles.container}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Pressable style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 400,
        alignSelf: 'center',
        marginTop: 40,
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    email: {
        color: '#888',
        marginBottom: 16,
    },
    bio: {
        marginBottom: 24,
        textAlign: 'center',
    },
    button: {
        marginTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#0070f3',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});