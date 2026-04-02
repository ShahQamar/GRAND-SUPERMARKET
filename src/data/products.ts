export interface Product {
  id: string;
  name: string;
  variant: string;
  price: number;
  imageUrl: string;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Poochie Play Pants', variant: 'S (3–8 kg), 40 pcs', price: 275, imageUrl: '' },
  { id: 'p2', name: 'Mamy Poko Pants', variant: 'NB (0–5 kg), 40 pcs', price: 260, imageUrl: '' },
  { id: 'p3', name: 'Britannia Good Day', variant: 'Small pack', price: 10, imageUrl: '' },
  { id: 'p4', name: 'Oreo Bis', variant: 'Small pack', price: 10, imageUrl: '' },
  { id: 'p5', name: 'Parle-G Gold', variant: 'Small pack', price: 10, imageUrl: '' },
  { id: 'p6', name: 'Tasty Gupshup', variant: '200 g', price: 49, imageUrl: '' },
  { id: 'p7', name: 'Nut Cracker', variant: '200 g', price: 48, imageUrl: 'https://m.media-amazon.com/images/I/71w%2B72B%2BZRL._SX679_.jpg' },
  { id: 'p8', name: 'Chatpata Dal', variant: '200 g', price: 48, imageUrl: '' },
  { id: 'p9', name: 'Peanut Roasted', variant: '200 g', price: 58, imageUrl: '' },
  { id: 'p10', name: 'Shahi Mixture', variant: '200 g', price: 111, imageUrl: '' },
  { id: 'p11', name: 'Samosa (Haldiram’s)', variant: '200 g', price: 58, imageUrl: '' },
  { id: 'p12', name: 'Mini Bhakarwadi', variant: '200 g', price: 58, imageUrl: '' },
  { id: 'p13', name: 'Mathri', variant: '200 g', price: 58, imageUrl: '' },
  { id: 'p14', name: 'Lite Chiwda', variant: '150 g', price: 35, imageUrl: '' },
  { id: 'p15', name: 'Lite Mix', variant: '150 g', price: 35, imageUrl: '' },
  { id: 'p16', name: 'Golden Mixture', variant: '150 g', price: 35, imageUrl: '' },
  { id: 'p17', name: 'Aloo Bhujia', variant: '200 g + 20 g', price: 48, imageUrl: '' },
  { id: 'p18', name: 'Aloo Bhujia Large', variant: '400 g', price: 96, imageUrl: '' },
  { id: 'p19', name: 'Navratna Mix Large', variant: '400 g', price: 87, imageUrl: '' },
  { id: 'p20', name: 'Kashmiri Mixture', variant: '400 g', price: 153, imageUrl: '' },
  { id: 'p21', name: 'Navratan Mix', variant: '200 g', price: 44, imageUrl: '' },
  { id: 'p22', name: 'Khatta Meetha', variant: '200 g', price: 44, imageUrl: '' },
  { id: 'p23', name: 'Teekha Meetha', variant: '200 g', price: 35, imageUrl: '' },
  { id: 'p24', name: 'All in One', variant: '200 g', price: 53, imageUrl: '' },
  { id: 'p25', name: 'Moong Dal', variant: '200 g', price: 53, imageUrl: '' },
  { id: 'p26', name: 'Dal Biji', variant: '200 g', price: 53, imageUrl: '' },
  { id: 'p27', name: 'Gupshup Peanuts', variant: '200 g', price: 49, imageUrl: '' },
  { id: 'p28', name: 'Nut Cracker', variant: '200 g', price: 48, imageUrl: 'https://m.media-amazon.com/images/I/71w%2B72B%2BZRL._SX679_.jpg' }
].map(p => ({
  ...p,
  // Using a placeholder image service that generates consistent images based on the product name
  imageUrl: p.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&size=400&font-size=0.3`
}));
