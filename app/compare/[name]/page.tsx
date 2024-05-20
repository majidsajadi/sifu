import { formatDate } from "@/utils/date";
import {
  Circle,
  LinkIcon,
  GitCommitHorizontal,
  Pentagon,
  DiamondPercent,
  DiamondMinus,
  DiamondPlus,
  File,
} from "lucide-react";
import { changelog, commits } from "./data";
import { TComparePageProps } from "./types";

import styles from "./page.module.css";
import clsx from "clsx";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardExtra } from "@/ui/card";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Page({ params }: TComparePageProps) {
  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Commits</CardTitle>
          <CardExtra>
            <Badge>
              <GitCommitHorizontal size={14} />
              {commits.total} commits
            </Badge>
            <Badge>
              <File size={14} />
              {commits.files} files change
            </Badge>
            <Button variant="secondary" size="icon" asChild>
              <Link href={commits.url}>
                <LinkIcon size={14} />
              </Link>
            </Button>
          </CardExtra>
        </CardHeader>
        <CardContent>
          <ul className={styles.timeline}>
            <li className={clsx(styles.item, styles.head)}>
              <div className={styles.separator}>
                <div className={styles.dot}>
                  <Pentagon size={14} />
                </div>
                <div className={styles.line}></div>
              </div>
              <div className={styles.content}>2.1.3</div>
            </li>
            {commits.commits.map((commit) => (
              <li className={styles.item}>
                <div className={styles.separator}>
                  <div className={styles.dot}>
                    <Circle size={12} />
                  </div>
                  <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                  <div className={styles.heading}>
                    <Link href={commit.url} className={styles.sha}>
                      {commit.sha.substring(0, 7)}
                    </Link>
                    <span className={styles.title}>
                      {commit.message.split("\n")[0]}
                    </span>
                  </div>
                  <div className={styles.description}>
                    <span>
                      authored by{" "}
                      <Link href={commit.author.url} className={styles.author}>
                        {commit.author.name}
                      </Link>{" "}
                      on {formatDate(commit.date)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            <li className={clsx(styles.item, styles.head)}>
              <div className={styles.separator}>
                <div className={styles.dot}>
                  <Pentagon size={14} />
                </div>
              </div>
              <div className={styles.content}>2.1.3</div>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Changelog</CardTitle>
          <CardExtra>
            <Button variant="secondary" size="icon" asChild>
              <Link href={changelog.href}>
                <LinkIcon size={14} />
              </Link>
            </Button>
          </CardExtra>
        </CardHeader>
        <CardContent>
          {changelog.entries.map((entry) => (
            <div>
              <div>{entry.version}</div>
              <MDXRemote source={entry.content} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
