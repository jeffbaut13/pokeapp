"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./lib/store";
import { useAppDispatch } from "./lib/hooks";
import { setFavoritePokemons } from "./lib/features/pokemons/pokemonSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favorite-pokemons") ?? "{}"
    );

    if (storeRef.current) {
      storeRef.current.dispatch(setFavoritePokemons(favorites));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
