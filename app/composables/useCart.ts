/** Кошик-мокап: лише лічильник позицій, без бекенду й чекауту. */
export const useCart = () => useState<number>('cart-count', () => 0)
