import {
  getFirestore,
  collection,
  doc,
  getDoc,
  DocumentSnapshot,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from '@/services/exportFirebase';

interface imagesProps {
  [id: string]: string;
}

interface ProductProps {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    id: string;
    available: boolean;
    stars: number;
  };
}