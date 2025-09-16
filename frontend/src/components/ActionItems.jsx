export const ActionItems = ({ items }) => {
  return (
    <li className="p-4 bg-card border border-border rounded-lg shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-200 ease-out mb-2 last:mb-0">
      <div className="flex items-center space-x-3">
        <input
          id={`checkbox-${items.id}`} 
          type="checkbox"
          className="
            w-4 h-4 text-primary bg-background border-2 border-border
            rounded focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
            transition-all duration-200 ease-out cursor-pointer
            checked:bg-primary checked:border-primary
          "
        />
        <label
          htmlFor={`checkbox-${items.id}`}
          className="flex-1 text-sm leading-relaxed cursor-pointer hover:text-primary transition-colors duration-200"
        >
          {items.action_item}
        </label>
      </div>
    </li>
  );
};