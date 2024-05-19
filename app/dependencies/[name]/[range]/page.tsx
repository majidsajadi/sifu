import querystring from "node:querystring";
import Link from "next/link";
import { Ban, CheckCircle } from "lucide-react";
import { getDependency } from "@/lib/dependency";
import { Version } from "@/components/version";
import { formatDate } from "@/utils/date";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import styles from "./page.module.css";

export type TDependenciesRouteParams = {
  name: string;
  range: string;
};

export type TDependenciesPageProps = {
  params: TDependenciesRouteParams;
};

export default async function Page({ params }: TDependenciesPageProps) {
  const name = decodeURIComponent(params.name);
  const range = decodeURIComponent(params.range);
  const { availableVersions, repository } = await getDependency(name, range);

  const renderList = () => (
    <ul className={styles.list}>
      {availableVersions.available.map(
        ({ version, date, satisfies, deprecated }) => {
          const query = querystring.stringify({
            owner: repository?.owner,
            repo: repository?.repo,
            directory: repository?.directory,
            range,
            version,
          });
          const href = `/compare/${params.name}?${query}`;

          return (
            <li className={styles.item} key={version}>
              <div className={styles.info}>
                <span className={styles.date}>
                  Released on {formatDate(date)}
                </span>
                {satisfies && (
                  <Badge variant="success">
                    <CheckCircle size={14} />
                    <span>Satisfies {range}</span>
                  </Badge>
                )}
                {deprecated && (
                  <Badge variant="danger">
                    <Ban size={14} />
                    <span>Deprecated</span>
                  </Badge>
                )}
                <Version value={version} range={range} />
              </div>
              <Button asChild variant="ghost">
                <Link href={href}>Compare</Link>
              </Button>
            </li>
          );
        }
      )}
    </ul>
  );

  const renderEmpty = () => (
    <div className={styles.empty}>
      <CheckCircle />
      <h3>There is no available version</h3>
      <p>You have the latest version installed</p>
    </div>
  );

  return (
    <div className={styles.container}>
      {!!availableVersions.available.length ? renderList() : renderEmpty()}
    </div>
  );
}
