import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from './Home';

describe("Home",()=>{
    it('renders the header title',()=>{
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        );
        expect(screen.getByText(/TOPShop/i)).toBeInTheDocument();
    });

    it('renders the navigation bar',()=>{
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        );
        
        expect(screen.getByRole('link', {name: /Home/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Shop/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Cart/i})).toBeInTheDocument();
    });

    it('renders main content',()=>{
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        )

        expect(screen.getByText(/Discover Quality Products for Everyday Life/i)).toBeInTheDocument();
        expect(screen.getByText(/Explore our collection of carefully curated items designed to enhance your lifestyle/i)).toBeInTheDocument();
        expect(screen.getByRole('button',{name: /Shop now/i})).toBeInTheDocument();
    });
})