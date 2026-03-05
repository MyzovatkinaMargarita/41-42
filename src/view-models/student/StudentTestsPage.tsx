/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import StudentHeader from "../../components/student/StudentHeader";
import TestCard from "../../components/tests/TestCard";
import FiltersBar from "../../components/student/StudentFiltersBar";
import { useStores } from "../../store/useStores";
import { StudentTestPageVM } from "../../view-models/student/StudentTestPageVM";

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
`;

const StudentTestsPage = observer(() => {
  const root = useStores();
  const vm = useMemo(() => new StudentTestPageVM(root), [root]);

  useEffect(() => {
    vm.init();
  }, [vm]);

  if (vm.loading) {
    return <div>Загрузка...</div>;
  }

  if (vm.error) {
    return <div style={{ color: "red" }}>{vm.error}</div>;
  }

  return (
    <div>
      <StudentHeader title="Доступные тесты" />
      <FiltersBar onFiltersChange={vm.onFiltersChange} />
      <Grid>
        {vm.visibleTests.map((t) => (
          <TestCard 
            key={t.id} 
            test={t} 
            lastAttempt={vm.lastAttemptByTest.get(t.id)} 
          />
        ))}
      </Grid>
    </div>
  );
});

export default StudentTestsPage;
