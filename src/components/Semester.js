import { Card, CardContent } from './ui/card';

export default function Semester({ semester }) {
  return (
    <div className="p-2 border rounded-lg">
      <h2 className="font-bold mb-2">{semester.name}</h2>
      {semester.courses.map((course, idx) => (
        <Card key={idx} className="mb-2">
          <CardContent>
            <p className="font-semibold">{course.name}</p>
            <p className="text-sm text-gray-600">{course.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
