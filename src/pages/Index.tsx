import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Cosmic Essence',
      price: 2999,
      image: 'https://cdn.poehali.dev/projects/8f708a31-3ae5-416e-a482-9f0868cfadd4/files/a7620c55-7945-4772-b25a-99fbbc6aa5f7.jpg',
      category: 'Premium'
    },
    {
      id: 2,
      name: 'Lunar Dream',
      price: 1899,
      image: 'https://cdn.poehali.dev/projects/8f708a31-3ae5-416e-a482-9f0868cfadd4/files/180d377b-fcb4-4cb2-a4d1-8f980d55cb0d.jpg',
      category: 'Bestseller'
    },
    {
      id: 3,
      name: 'Starlight Vision',
      price: 3499,
      image: 'https://cdn.poehali.dev/projects/8f708a31-3ae5-416e-a482-9f0868cfadd4/files/9cc27a23-4cc9-41a1-b83f-6db151d96758.jpg',
      category: 'New'
    },
    {
      id: 4,
      name: 'Aurora Glow',
      price: 2499,
      image: 'https://cdn.poehali.dev/projects/8f708a31-3ae5-416e-a482-9f0868cfadd4/files/a7620c55-7945-4772-b25a-99fbbc6aa5f7.jpg',
      category: 'Popular'
    },
    {
      id: 5,
      name: 'Nebula Touch',
      price: 2799,
      image: 'https://cdn.poehali.dev/projects/8f708a31-3ae5-416e-a482-9f0868cfadd4/files/180d377b-fcb4-4cb2-a4d1-8f980d55cb0d.jpg',
      category: 'Premium'
    },
    {
      id: 6,
      name: 'Galaxy Spirit',
      price: 3199,
      image: 'https://cdn.poehali.dev/projects/8f708a31-3ae5-416e-a482-9f0868cfadd4/files/9cc27a23-4cc9-41a1-b83f-6db151d96758.jpg',
      category: 'Exclusive'
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ✨ Cosmic Store
          </h1>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative hover:scale-105 transition-transform">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 animate-scale-in">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-heading">Корзина</SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="overflow-hidden animate-fade-in">
                        <CardContent className="p-4 flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold">{item.name}</h3>
                            <p className="text-primary font-semibold">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity === 1}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="border-t border-border pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-heading text-lg">Итого:</span>
                        <span className="font-heading text-2xl font-bold text-primary">
                          {totalPrice.toLocaleString()} ₽
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                        Оформить заказ
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              В образе луны созерцаются огни
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Откройте для себя коллекцию товаров, созданных под влиянием космических вдохновений и лунных ночей
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105">
              Исследовать каталог
              <Icon name="Sparkles" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-heading font-bold mb-4">Наш каталог</h3>
          <p className="text-muted-foreground">Уникальные товары для особенных моментов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 animate-fade-in hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm">
                    {product.category}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-heading font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                    >
                      <Icon name="ShoppingBag" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ✨ Cosmic Store
          </h4>
          <p className="text-muted-foreground mb-6">
            Создано с любовью и вдохновением от космоса
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="sm">
              <Icon name="Mail" size={18} className="mr-2" />
              Контакты
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Info" size={18} className="mr-2" />
              О нас
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="HelpCircle" size={18} className="mr-2" />
              Помощь
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
