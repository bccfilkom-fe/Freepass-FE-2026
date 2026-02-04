/**
 * Order Header Component
 * Displays orders page title and description
 */

export function OrderHeader() {
   return (
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <h1 className="text-4xl font-bold mb-2">My Orders</h1>
         <p className="text-muted-foreground">
            Track your orders and manage payments
         </p>
      </div>
   );
}
