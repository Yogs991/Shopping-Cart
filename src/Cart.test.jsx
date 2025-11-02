import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest'
import { MemoryRouter } from 'react-router';
import Cart from './Cart';
import userEvent from '@testing-library/user-event';

describe(Cart, ()=>{
    it('shows your cart is empty when it has no items',()=>{
        render(
            <MemoryRouter>
                <Cart cartItems= {[]} />
            </MemoryRouter>
        );
        expect(screen.getByText(/Your cart is empty. Click here to go back/i)).toBeInTheDocument();
    });

    it('displays a product',()=>{
        const cartItems = [
            {
                product:{
                    id: 1,
                    title: 'Jacket',
                    image: 'test.jpg',
                    price: 10,
                },
                quantity: 1,
            },
        ];

        render(
            <MemoryRouter>
                <Cart cartItems={cartItems}/>
            </MemoryRouter>
        )

        expect(screen.getByText(/Jacket/i)).toBeInTheDocument();
    });

    it('removes product from cart', async ()=>{
        const mockRemove = vi.fn();
        const cartItems = [
            {
                product:{
                    id: 1,
                    title: 'Jacket',
                    image: 'test.jpg',
                    price: 10,
                },
                quantity: 1,
            },
        ];
        
        render(
            <MemoryRouter>
                <Cart cartItems={cartItems} setCartItems={mockRemove}/>
            </MemoryRouter>
        );

        const removeBtn = screen.getByRole('button',{name: /Remove/i });
        await userEvent.click(removeBtn);
        expect(mockRemove).toHaveBeenCalled();
    });

    it('checks total price logic',()=>{
        const cartItems = [
            {
                product:{
                    id: 1,
                    title: 'Jacket',
                    image: 'test.jpg',
                    price: 10,
                },
                quantity: 2,
            },
        ];

        const setCartItem = vi.fn();
        render(
            <MemoryRouter>
                <Cart cartItems={cartItems} setCartItems={setCartItem}/>
            </MemoryRouter>
        )

        const totalItem = 2 * 10;
        expect(screen.getByText(`Total: $${totalItem}`)).toBeInTheDocument();
    })
})