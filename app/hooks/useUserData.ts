import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export interface UserDataType {
    authToken: string;
    userName: string;
    isLoggedIn: boolean;
}

const useUserData = () => {
    const [userData, setUserData] = useState<UserDataType | null>(null);

    useEffect(() => {
        const userDataCookie = Cookies.get('userData');
        const parsedUserData = JSON.parse(userDataCookie || '{}') as UserDataType;
        setUserData(parsedUserData);

        // Listen for the storage event to update the user data
        const storageEventListener = (event: StorageEvent) => {
            if (event.key === 'userData') {
                const updateUserData = JSON.parse(event.newValue || '{}') as UserDataType;
                setUserData(updateUserData);
            }
        }
        window.addEventListener('storage', storageEventListener);

        // Clean up the event listeneer when the component unmounts
        return () => {
            window.removeEventListener('storage', storageEventListener);
        }
    }, []);

    return userData;
}

export default useUserData;