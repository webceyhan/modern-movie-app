type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function Search({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
