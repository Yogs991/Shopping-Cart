import {render, screen} from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import {userEvent} from '@testing-library/user-event'
import Shop from './Shop'

describe("testing Shop page",()=>{
    it('shows loading message initially',()=>{
        render(
            <MemoryRouter>
                <Shop/>
            </MemoryRouter>
        );
        const message = screen.getByText(/Loading.../i);
        expect(message).toBeInTheDocument();
    })

    it('throws network error if the fetch fails',async ()=>{
        globalThis.fetch = vi.fn().mockRejectedValue(new Error('A network error was encountered'));
        render(
            <MemoryRouter>
                <Shop/>
            </MemoryRouter>
        )
    })

    it('checks for successful fetch and display of products',async ()=>{
        const mockProducts = [
            {
                id: 1,
                title: 'Jacket',
                image: 'test.jpg',
                price: 20.99,
            }
        ];
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok : true,
            json: async () => mockProducts,
        });

        render(
            <MemoryRouter>
                <Shop/>
            </MemoryRouter>
        )
        const success = await screen.findByText(/Jacket/i);
        expect(success).toBeInTheDocument();
        expect(screen.getByText("$20.99")).toBeInTheDocument();
    });

    it('increases and decreases quantity on button click and add to cart',async ()=>{
        const mockProducts = [
            {
                id: 1,
                title: 'Jacket',
                image: 'test.jpg',
                price: 20.99,
            }
        ];

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async ()=> mockProducts,
        });

        const setCartItems = vi.fn();
        render(
            <MemoryRouter>
                <Shop cartItems={[]} setCartItems={setCartItems}/>
            </MemoryRouter>
        )

        await screen.findByText(/Jacket/i);
        const increaseBtn = screen.getByRole("button",{name: "+"});
        const decreaseBtn = screen.getByRole("button",{name: "-"});

        await userEvent.click(increaseBtn);
        expect(screen.getByDisplayValue("2")).toBeInTheDocument();

        await userEvent.click(decreaseBtn);
        expect(screen.getByDisplayValue("1")).toBeInTheDocument();

        const addBtn = screen.getByRole("button", {name: /Add to cart/i});
        await userEvent.click(addBtn);
        expect(setCartItems).toHaveBeenCalled(1);
        expect(setCartItems).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    product: mockProducts[0],
                    quantity: 1,
                })
            ])
        )
    });
})

