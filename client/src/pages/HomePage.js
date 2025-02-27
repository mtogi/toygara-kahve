import React from 'react';
import CoffeeOption from '../components/CoffeeOption';

const HomePage = () => {
  // Coffee options data
  const coffeeOptions = [
    {
      type: 'kucuk',
      title: 'Küçük Kahve',
      price: 300, // $3.00 in cents
      description: 'Desteğin küçüğü olmaz!',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'orta',
      title: 'Orta Kahve',
      price: 500, // $5.00 in cents
      description: 'Sabahları uyanmam için yeterli!',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'buyuk',
      title: 'Büyük Kahve',
      price: 700, // $7.00 in cents
      description: 'Bütün gün için yeterli!',
      image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div>
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Kahve...</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        İçince inceciktir<br />
        Fincandaki çiçektir<br />
        İlla içilecektir<br />
        Menengiç kokulu kahve<br />
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {coffeeOptions.map((option) => (
          <CoffeeOption
            key={option.type}
            type={option.type}
            title={option.title}
            price={option.price}
            description={option.description}
            image={option.image}
          />
        ))}
      </section>
      
      <section className="mt-16 bg-white rounded-xl p-8 shadow-coffee">
        <h3 className="text-2xl font-bold mb-4 text-primary">İşleyiş</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h4 className="font-semibold mb-2">Kahve boyunu seçiniz.</h4>
            <p className="text-gray-600">Ismaralmak istediğiniz kahve boyunu seçiniz.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h4 className="font-semibold mb-2">Güvenli Ödeme</h4>
            <p className="text-gray-600">Ödemeniniz güvenli bir şekilde yapılacaktır.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h4 className="font-semibold mb-2">Keyfinize Emanet</h4>
            <p className="text-gray-600">Bana kahve ısmarladığınız için teşşekkürler.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 