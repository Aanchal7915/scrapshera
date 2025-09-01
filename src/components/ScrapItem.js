import logo from "../assets/logo.png"
export default function ScrapItem({ item }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
      <div className="text-3xl">{item.icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.rate}</p>
      </div>
    </div>
  );
}
